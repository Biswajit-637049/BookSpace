import { Hero } from "../Components/Home/Hero";
import RecentlyAdded from "../Components/Home/RecentlyAdded";
export function Home(){
    return(
        <div className="bg-zinc-800 text-white">
           <Hero/>
           <RecentlyAdded/>
        </div>
    )
}