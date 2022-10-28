import Head from "next/head";
import Link from "next/link";
import {useEffect, useState } from "react";
import NavBar from "./component/navbar";
import Postlists from "./postlists/postlists";
import InfiniteScroll from 'react-infinite-scroll-component';
import React from "react";

function Home({fakeText}) {
  // State to show the data is loading or not..
  const [loading, finishLoad] = useState(false);

  // We want to set the postlist from the fetch getServerSideProps Initially...
  const [post, setPosts] = useState(fakeText);

  // We want to set the current scroll state as on the top of the page..
  const [ scrollPos, setScrollPos ] = useState(0);

  // We want to get more post if the user scroll down by passing params of the post length...
  const getMorePosts = async() => {
    const res = await fetch(`https://fakestoreapi.com/products?_start=${post.length}&_limit=4`);
    const newPosts = await res.json();
    setPosts(post => [...post, ...newPosts]);
  }

  // We want to set the y axis of the current scroll...
  const handleScrollPos = () => {
    setScrollPos(window.scrollY);
  };

  // Change the state to finish load the post... and reset the scroll
  useEffect(() => { 
    finishLoad(true); 

    // Reset to 0
    window.scrollTo(0, scrollPos);

    
  },[scrollPos])

  // add the scroll to event 
  useEffect(() => {
    window.addEventListener('scroll', handleScrollPos);
    return () => {
        window.removeEventListener('scroll', handleScrollPos);
    };
  }, []);

  if(!loading) {
    return <div className="text-center">Somethign is cooking...</div>;
  }

  if (typeof window === 'undefined') {
    return (<div>Error - Couldnt get page data</div>);
  } else {
    return (
      <div>
        <Head>
          <title>PathPlay - Assessment</title>
          <meta name="description" content="For assessment..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar></NavBar>
        {/* Use infinite scroll hook */}
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
                
                <Link 
                  as={`/postlists/${element.id}`}
                  scroll={false}
                  href="/postlists/[id]"
                >
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
  const resFakeText = await fetch(`https://fakestoreapi.com/products?limit=4`);
  const fakeText = await resFakeText.json();
  return {
    props: { fakeText }
  }
}

export default Home;