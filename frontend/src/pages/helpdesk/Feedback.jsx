import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate } from 'react-router-dom';

function Feedback(){
  const allCategory=[
    {"category":"General","img":"/General.png","description":"Let us know how we can enhance health and hygiene standards to ensure a clean and healthy work environment"},
    {"category":"Facilites","img":"/Facilities.png","description":"Let us know how we can enhance health and hygiene standards to ensure a clean and healthy work environment"},
    {"category":"Workplace","img":"/Workplace.png","description":"Let us know how we can enhance health and hygiene standards to ensure a clean and healthy work environment"},
    {"category":"Safety & Security","img":"/Safety.png","description":"Let us know how we can enhance health and hygiene standards to ensure a clean and healthy work environment"},
    {"category":"Health & Hygiene","img":"/Health.png","description":"Let us know how we can enhance health and hygiene standards to ensure a clean and healthy work environment"},
    {"category":"Management","img":"/Management.png","description":"Let us know how we can enhance health and hygiene standards to ensure a clean and healthy work environment"},
    {"category":"Cafeteria","img":"/Cafeteria.png","description":"Let us know how we can enhance health and hygiene standards to ensure a clean and healthy work environment"},
    {"category":"Development","img":"/Development.png","description":"Let us know how we can enhance health and hygiene standards to ensure a clean and healthy work environment"},
  ]

  return(
      <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Feedback</h1>
          <p className="text-lg">Your feedback shapes our actions and decisions.</p>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap h-full w-[70%]">
            {allCategory.map((category,index)=>(
              <IndividualCategory categoryName={category.category} img={category.img} description={category.description}/>
            )
            )}
          </div>
        </div>
      </div>
  )
}

const IndividualCategory=({categoryName,img,description})=>{
  const data={"category":categoryName,"description":description};
  const navigate = useNavigate();
  const handleChooseCategory = (e) => {
    e.preventDefault();
    // Logic for handling login
    // For now, just navigate to the home page
    navigate('/helpdesk/submitFeedback', {state:data} );
  };

  return (
    <button onClick={handleChooseCategory} className="flex flex-col hover:scale-110 transition-transform h-44 w-48 justify-center items-center m-7 bg-[#EAF3FF] rounded-lg">
      <div className="w-[80%] h-[80%] p-5">
        <img className="w-full h-full" src={img} alt={categoryName}/>
      </div>
      <p className="h-[20%]">{categoryName}</p>
    </button>
  )
}

export default Feedback;