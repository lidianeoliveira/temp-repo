import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  //Trabalhando com array
  state = {
    posts: [],
    allPosts: [],
    page: 0, //Página inicial
    postsPerPage: 12, //Posts por página
    searchValue: ''
  };

  //Componente montado
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { post, postsPerPage } = this.state;
    const postAndPhotos = await loadPosts();
    this.setState({
      posts: postAndPhotos.slice(post, postsPerPage), //Slice fatia o array
      allPosts: postAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page, //Página atual
      postsPerPage, //Posts por página
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state; //Pega o Post de dentro do state
    /*Verifica se a página próxima página é maior que 
    a quantidade de posts que existem, não existem mais posts*/
    const noMorePosts = page + postsPerPage >= allPosts.length;

    /**Verifica se tem algum valor no searchValue */
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;




    return (
      <section className='container'>
        <div className='search-container'>
          {/*Verifica se tem alguma coisa sendo digitada na busca */}
          {!!searchValue && (
            <>
              <h1>Search Value: {searchValue}</h1>
            </>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts!</p>
        )}

        <div className='button-container'>
          {/**Verifica se não está fazendo busca mostra o botão */}
          {!searchValue && (
            <Button
              text="Load More Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}

        </div>
      </section>

    );
  }
}


