export default function UserProfile({params}:any){

    return(
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
          <h1>Profile</h1>
          <hr/>
          <p>Profile Page <span className="text-4xl"> {params.id}</span></p>
        </div>
    )
}