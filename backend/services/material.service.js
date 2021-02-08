const db = require('../helpers/db.js');
const { Op, Sequelize } = require('sequelize');

module.exports = {
    getAll,
    getById,
    update,
    delete: _delete,
    create,
    getCategoryTreeById,
    filterMaterials
};

//should be used for the list of materials page we will get the infos based on basicDetails,
// which is id, names, end categories and images
//wird nicht verwendet für controller
async function getAll() {
    const material = await db.Material.findAll( );
    //console.log("material", material);
    //return material.map(x => basicDetails(x));
    const data = Promise.all(material.map(x => basicDetails(x)));
    //const data = material.map(async (x) => await basicDetails(x));
    //console.log('get all response', data);
    return data;
}

async function getById(id) { //returns only the end category but not rest of the categories, use getCategoryTreeById for this
    const material = await getMaterial(id);
    return basicDetails(material);
}

async function update(id, payload) { // update material infos
    let material = await getMaterial(id);

    material.destroy();

    material = await db.Material.create({name: payload.name, created_by: payload.created_by});
    for (const consistsOf of payload.consistsOf) {
        consistsOf.material_id = material.id;
        await db.ConsistsOf.create(consistsOf);
    }

    for (const image of payload.images) {
        image.material_id = material.id
        await db.Image.create(image);
    }

    return basicDetails(material);
}


async function _delete(id) {
    const material = await getMaterial(id);
    await material.destroy();
}

async function getMaterial(id) {
    const material = await db.Material.findByPk(id);
    if (!material) throw 'Material is not found';
    return material;
}



async function create(payload) { //Material creation
    const material = await db.Material.create({name: payload.name, created_by: payload.created_by}); //creates the Material in DB and returns the object incl ID
    for (const consistsOf of payload.consistsOf) { // loop over the array and populate each consistsOf,eg { category_id: 8, degree: "80" }
        consistsOf.material_id = material.id;
        await db.ConsistsOf.create(consistsOf);
    }

    //console.log('image details', payload.images);
    for (const image of payload.images) { // send info for param: url and name
        image.material_id = material.id;
        await db.Image.create(image);
    }

    return basicDetails(material);
    //const details = basicDetails(material); // because we want to console log it
    //console.log('basic details', details);
    //return details;
}

async function basicDetails(material) { /* db.Material */
    const data = {
        id: material.id,
        name: material.name,
        created_by: material.created_by,
        categories: [], //send only the last category chosen
        images: [],
    };

    const consistsOfs = await db.ConsistsOf.findAll({
        where: {
            material_id: material.id
        },
        include: db.Category,
    });
    //console.log('material consistsOf', consistsOfs);
    consistsOfs.forEach( consistsOf => { /* res object db.ConsistsOf */
            data.categories.push({
                category_id: consistsOf.category_id,
                category: consistsOf.category.name,
                degree: consistsOf.degree,
                parent_id: consistsOf.category.parent_category,
            });
    });

    const images = await material.getImages();
    //console.log('images', images);
    images.forEach( image => { /* db.Image */
        data.images.push({
            url: image.url,
            name: image.name,
        });
    });
    return data;
}

async function getCategoryTreeById(id) { //returns the whole category tree for material id
    const material = await getMaterial(id);
    const categoryTree = {};
    const categories = {};


    if (!material) {
        return ;
    }

    const consistsOfs = await db.ConsistsOf.findAll({
        where: {
            material_id: material.id
        },
        include: db.Category,
    });

    for (const consistsOf of consistsOfs) {
        await addCategoryToTree(consistsOf.category, consistsOf.degree);
    }

    async function addCategoryToTree(category, degree = null) {
        const data = {
            id: category.id,
            name: category.category_name,
        };
        if (category.children !== undefined) { // in case there are children of it
            data.children = category.children; // save the children here
        }
        if (degree !== null) { // if category has degree, save it in data
            data.degree = degree;
        }
        // Add category.id => data to the array categories
        categories[category.id] = data;
        console.log(category);
        const parent = await category.getCategory();
        if (!parent) { // If category.parent_category is null, add category to categoryTree, return
            categoryTree[category.id] = data;
        } else { // If category.parent_category is not null
            if (categories[parent.id] !== undefined) { // If category.parent_category exists in categories, then add category data to its children, return
                categories[parent.id].children[category.id] = data;
            } else { // Else add category to parent_category's children and call addCategoryToTree for parent_category
                parent.children = {};
                parent.children[category.id] = data;
                await addCategoryToTree(parent);
            }
        }
    }
    return categoryTree;
}


// Return all materials
// function input: filters = { catId: degree, catId: degree } eg { "3": null, "8": 2 }
async function filterMaterials(filters, limit = 10, offset = 0) { //Limit is how many to return and offset is how many to skip
    const wheres = [];

    for( const catId in filters) {
        const degree = filters[catId];
        const category = await db.Category.findByPk(catId),
            endCatIds = await getAllEndCategories(category);
        let where;

        // For sanitization, check prepared queries in sequelize 'where table1.column2 = :val1', setParam('val1', 35)
        if (endCatIds.length === 1) { // If we have only one end category, we will use = in where condition
            where = { category_id: endCatIds[0] };
            // add degree check only if degree is not null
            if (degree !== null) {
                if (typeof degree === "array"){
                    where.degree = { [Op.between]: degree }
                }else{
                    where.degree = degree;
                }
            }
        } else { // for more categories, we use where in
            where = { category_id: endCatIds };
        }
        wheres.push(where);
    }

    // [1,2,3,4] or [{material_id: 1},{material_id: 2},{material_id: 3}]
    let materialIds = await db.ConsistsOf.findAll({
        where: {
            [Op.or]: wheres
        },
        attributes: [
            // specify an array where the first element is the SQL function and the second is the alias
            [Sequelize.fn('DISTINCT', Sequelize.col('material_id')) ,'material_id'],
        ],
        'limit': limit, // limit is shorthand for 'limit': limit, like offset
        offset,
    });

    // If materialIds are like [{material_id: 1},{material_id: 2},{material_id: 3}] then >
    // change const materialIds to let materialIds
    materialIds = materialIds.map(material => material.material_id);

    console.log('materialIds', materialIds);
    async function getAllEndCategories(category) { //in case FE sends category that is not endcat
        let endCatIds = [];

        const children = await db.Category.findAll({ where: { parent_category: category.id } });
        if (!children.length) { // in case there are no children or its empty array
            endCatIds = [category.id];
        }
        else {
            for(const child of children) {
                const childEndCatIds = await getAllEndCategories(child);
                endCatIds = [...endCatIds, ...childEndCatIds];
            }
        }

        return endCatIds;
    }

    // Get materials by ids
    const materials = await db.Material.findAll({
        where: {
            id: materialIds
        }
    });
    //console.log('material', materials);

    const response = Promise.all(materials.map(x => basicDetails(x)));
    console.log('response is:', response);
    return response;
}

    /** Example for Cotton, weight, elasticity - 3 filter selected
    m.*
from
    material m
    inner join consistsOf c1 on m.id = c1.material_id
    inner join consistsOf c2 on m.id = c1.material_id
    inner join consistsOf c3 on m.id = c1.material_id
where
    c1.category_id = [cotton] and c1.degree = [cotton_degree]
    c2.category_id = [weight] and c2.degree = [weight_degree]
    c3.category_id = [elasticity] and c3.degree = [elasticity_degree]
;
    // execute the query and return materials
    return db.querySomething(query);
}
**/
