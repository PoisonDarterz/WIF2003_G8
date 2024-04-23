import TopNavBlack from "../../components/TopNavBlack"

function MyTickets(){
    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">My tickets</h1>
          <p className="text-lg">Report any non-compliance here</p>
        </div>
        </div>
    )
}

export default MyTickets;