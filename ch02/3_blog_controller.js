const Views = {
  index(posts) {
    console.log('VIEWS.INDEX(posts)', posts);
    return posts;
  },
  show(posts) {
    console.log('VIEWS.SHOW(posts)', posts);
    return posts;
  }
};

const DB = {
  create(attr) {
    console.log('DB.CREATE(attr)', attr);
    return attr;
  },
  update(post, attr) {
    console.log('DB.UPDATE(post, attr)', post, attr);
    return attr;
  },
  destroy(post) {
    console.log('DB.DESTROY(post)', post);
    return post;
  }
};

// ignorant
const BlogController = {
  index(posts) {
    return Views.index(posts);
  },
  show(posts) {
    return Views.show(posts);
  },
  create(attr) {
    return DB.create(attr);
  },
  update(post, attr) {
    return DB.update(post, attr);
  },
  destroy(post) {
    return DB.destroy(attr);
  },
}

// enlightened
const BlogControllerRefactor = {
  index: Views.index,
  show: Views.show,
  create: DB.create,
  update: DB.update,
  destroy: DB.destroy
}

// Yet better
const BlogControllerRefactor2 = { ...Views, ...DB }
