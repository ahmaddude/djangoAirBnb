import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";

const MyFavoritesPage = async ()=>{
    const userId=await getUserId();

    if(!userId){
        return(
            <main className="max-w-375 max-auto px-6 py-12">
                <p>You need to be authenticated</p>
            </main>
        )
    }
        return(
            <main className="max-w-375 max-auto px-6 py-12">
                <h1 className="my-6 text-2xl">My favorites</h1>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6">
                    <PropertyList
                    favorites={true}
                    />
                </div>
            </main>
        )
    
}
export default MyFavoritesPage;