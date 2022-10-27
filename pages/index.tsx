import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavBar from "./component/navbar";
import Postlists from "./postlists/postlists";
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient();


// Main
function Home({fakeText}) {
  const [loading, finishLoad] = useState(false);
  

  const [post, setPosts] = useState(fakeText);
  
  const getMorePosts = async() => {
    const res = await fetch(`https://fakestoreapi.com/products?_start=${post.length}&_limit=10`);
    const newPosts = await res.json();
    setPosts(post => [...post, ...newPosts]);
  }

  useEffect(() => {
    if (post.length) {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if(scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
      }
    }
    finishLoad(true);
  }, [])

  if(!loading) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <div>
        <Head>
          <title>PathPlay - Assessment</title>
          <meta name="description" content="For assessment..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar></NavBar>
        <InfiniteScroll
        dataLength={post.length}
        next={getMorePosts}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p>This is the last row of data from API</p>
        }
        >
        {
          post.map((element) => {
            return (
              <div key={element.id}>
                <Link onClick={() =>
                  sessionStorage.setItem('scrollPosition', typeof window.pageYOffset)
                } scroll={false} href={`/postlists/${element.id}`}>
                  <Postlists 
                    id={element.id}
                    userProfileId={element.userProfileId}
                    url={element.image}
                    title={element.title}
                    thumbnailUrl={element.thumbnailUrl}
                  />
                </Link>
              </div>
            )
          })
        }
        </InfiniteScroll>
      </div>
    );
  }
}

// Load post
export async function getServerSideProps() {
  const resFakeText = await fetch(`https://fakestoreapi.com/products?limit=10`);
  const fakeText = await resFakeText.json();
  return {
    props: { fakeText }
  }
}

export default Home;


