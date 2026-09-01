import Image from "next/image"
import PropertyList from "../components/properties/PropertyList";


const MyPropertiesPage=()=>{
    return(
        <main className="max-w-375 mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My properties</h1>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6">
                    <PropertyList/>
                </div>
        </main>
    )
}
export default MyPropertiesPage;