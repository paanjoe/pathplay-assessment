import Image from "next/image";
import NavBar from "../component/navbar"

export const getServerSideProps = async (context) => {
    const id = context.params.id;
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    return {
        props: { post: data }
    }
}

const Details = ({post}) => {
    return (
        <div>
            <NavBar></NavBar>
            <a onClick={() => window.history.back()} className="bg-yellow-400 text-black text-3xl hover:bg-yellow-700">Go Back</a>
            <h1 className="text-5xl">Details Page</h1>
            <ul>
                <li>{post.id}</li>
                <li>{post.title}</li>
                <li>{post.id}</li>
            </ul>

                        <Image
                        src={post.image} 
                        alt={"Sample Picture"}
                        width={200}
                        height={200}
                    ></Image>
        </div>
    )
}


export default Details;