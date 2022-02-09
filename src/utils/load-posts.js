export const loadPosts = async () => {
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');

  const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

  const postsJson = await posts.json(); //Converte para json

  const photosJson = await photos.json();

  //Zipper, une 2 arrays pelo menor array
  const postAndPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url }
  });

  return postAndPhotos;
}