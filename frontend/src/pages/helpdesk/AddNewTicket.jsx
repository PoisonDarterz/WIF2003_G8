import TopNavBlack from "../../components/TopNavBlack"

function AddNewTicket(){
    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Add new ticket</h1>
          <p className="text-lg">Clear and thorough descriptions help us address your issue more effectively</p>
        </div>
        </div>
    )
}

export default AddNewTicket;