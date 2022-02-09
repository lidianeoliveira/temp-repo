import "./styles.css";
import { PostCard } from '../PostCard';

export const Posts = ({ posts }) => (
  <div className="posts">
    {/*Map retorna um array do javascript */}
    {posts.map(post => (
      <PostCard
        key={post.id}
        title={post.title}
        body={post.body}
        id={post.id}
        cover={post.cover}
      />
    ))}
  </div>
);