
import { Layout } from '@/components/custom/layout'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import {useState,useEffect,useContext} from 'react'
import AuthContext from '../../AuthContext'
import { LanguagePiechart } from './components/langauage-piechart'
import { RadialChart } from './components/radial-chart'
import Journals from './components/journal'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
interface Platform {
  id: string; // or number, depending on your API response
  platform: string;
}
interface Country {
  id: string; // or number, based on your API response
  country: string;
}
interface Language {
  id: string; // or number, based on your API response
  language: string;
}
interface ThematicArea {
  id: string; // or number, based on your API response
  thematic_area: string;
}



export default function Upload() {
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div> Loading...</div>;
  }
  // Now it's safe to access loginUser method from authContext
  const { user } = authContext;
  console.log(user)
 

   useEffect(() => {
    const authTokens = localStorage.getItem('authTokens');

    // If authTokens are missing, redirect to the sign-in page
    if (!authTokens) {
      window.location.href = '/sign-in'; // Using React Router's navigation
    }
  }); // Run this effect when the component mounts

  const [formData, setFormData] = useState({
    journal_title: '',
    platform: '',
    country: '',
    publishers_name: '',
    language: '',
    thematic_area: '',
    issn_number: '',
    link: '',
    aim_identifier: false,
    medline: false,
    summary: '',
    user:user.user_id,
  });
  const initialFormData = {
    journal_title: '',
    platform: '',
    country: '',
    publishers_name: '',
    language: '',
    thematic_area: '',
    issn_number: '',
    link: '',
    aim_identifier: false,
    medline: false,
    summary: '',
    user:'',
    // Add other fields here...
  };
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  //const [platforms, setPlatforms] = useState([]);  // To store platform options
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  //const [countries, setCountries] = useState([]);  // To store country options
  const [countries, setCountries] = useState<Country[]>([]);
 // const [languages,setLanguages]=useState([])
  const [languages, setLanguages] = useState<Language[]>([]);

 // const[thematic,setThematic]=useState([])
  const [thematic, setThematic] = useState<ThematicArea[]>([]);
    // Empty dependency array ensures it runs once when the component mounts
    //http://127.0.0.1:8000/journal_api/api/languages/
    //https://aphrc.site/journal_api/api/languages/
    useEffect(() => {
      fetch('https://aphrc.site/journal_api/api/languages/')
        .then(response => response.json())
        .then(data => setLanguages(data))
        .catch(error => console.error('Error fetching languages:', error));
    }, []);
    
    useEffect(() => {
      console.log('Updated languages:', languages);  // This will log whenever languages state updates
    }, [languages]); 
 //http://127.0.0.1:8000/journal_api/api/country/
 //https://aphrc.site/journal_api/api/country/
    useEffect(() => {
      fetch('https://aphrc.site/journal_api/api/country/')
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(error => console.error('Error fetching languages:', error));
    }, []);
    
    useEffect(() => {
      console.log('Updated countries:', countries);  // This will log whenever countries state updates
    }, [countries]); 
    //http://127.0.0.1:8000/journal_api/api/platform/
    //https://aphrc.site/journal_api/api/platform/
    useEffect(() => {
      fetch('https://aphrc.site/journal_api/api/platform/')
        .then(response => response.json())
        .then(data => setPlatforms(data))
        .catch(error => console.error('Error fetching languages:', error));
    }, []);
    
    useEffect(() => {
      console.log('Updated platforms:', platforms);  // This will log whenever countries state updates
    }, [platforms]); 
    //http://127.0.0.1:8000/journal_api/api/thematic/
    //https://aphrc.site/journal_api/api/thematic/
    useEffect(() => {
      fetch('https://aphrc.site/journal_api/api/thematic/')
        .then(response => response.json())
        .then(data => setThematic(data))
        .catch(error => console.error('Error fetching languages:', error));
    }, []);
    
    useEffect(() => {
      console.log('Updated Thematic:', thematic);  // This will log whenever countries state updates
    }, [thematic]); 


  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === 'checkbox' ? checked : value,
  //   });
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    // Check if the input is a checkbox
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
  
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  //https://aphrc.site/
  //http://127.0.0.1:8000/journal_api/api/journalcreate/
  //https://aphrc.site/journal_api/api/journalcreate/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://aphrc.site/journal_api/api/journalcreate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        alert('Journal Added Successfully')
        setFormData(initialFormData)
      } else {
        console.error('Error:', response.statusText);
        alert('OOps! An Error occured try again later')
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle the form visibility
  };

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search />
          <ThemeSwitch /> */}
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
       
       <h1>Welcome {user.user_name},</h1><br></br>
       <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
       <Card className='col-span-1 lg:col-span-2'>
                <CardHeader>
                  <CardTitle>Journal Language Distribution</CardTitle>
                  <CardDescription>Languages.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <RecentSales /> */}
                  <LanguagePiechart />
                </CardContent>
               
       </Card>
       <Card className='col-span-1 lg:col-span-2'>
                <CardHeader>
                  <CardTitle>Journals Disciplines Distribution</CardTitle>
                  <CardDescription>Disciplines/Thematic Area.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadialChart />
                </CardContent>
        </Card>
       </div>
       <br></br><br></br>
       <p  className="cursor-pointer text-blue-500 font-medium hover:text-blue-700">Submit Journals To Reviewers</p>
       <p 
       className="cursor-pointer text-blue-500 font-medium hover:text-blue-700">
        List of added Journals

       </p>
       <Journals/>
      {/* Text to show/hide form */}
      <p
        onClick={toggleFormVisibility}
        className="cursor-pointer text-blue-500 font-medium hover:text-blue-700"
      >
        Add Journal Manually
      </p>

      {/* Form is conditionally rendered based on isFormVisible state */}
      {isFormVisible && (
        // <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-6 mt-4">
        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Journal Title</label>
        //     <input
        //       type="text"
        //       name="journal_title"
        //       value={formData.journal_title}
        //       onChange={handleChange}
        //       required
        //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        //     />
        //   </div>

          
        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Platform</label>
        //     <select
        //       name="platform"
        //       value={formData.platform}
        //       onChange={handleChange}
        //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        //     >
        //       <option value="">Select a Platform</option>
        //       {platforms.map((platform) => (
        //         <option key={platform.id} value={platform.id}>
        //           {platform.platform}
        //         </option>
        //       ))}
        //     </select>
        //   </div>

        
        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Countries</label>
        //     <select
        //       name="country"
        //       value={formData.country}
        //       onChange={handleChange}
        //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        //     >
        //       <option value="">Select a Country</option>
        //       {countries.map((country) => (
        //         <option key={country.id} value={country.id}>
        //           {country.country}
        //         </option>
        //       ))}
        //     </select>
        //   </div>

        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Publisher's Name</label>
        //     <input
        //       type="text"
        //       name="publishers_name"
        //       value={formData.publishers_name}
        //       onChange={handleChange}
        //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        //     />
        //   </div>

         
        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Language</label>
        //     <select
        //       name="language"
        //       value={formData.language}
        //       onChange={handleChange}
        //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        //     >
        //       <option value="">Select a Language</option>
        //       {languages.map((lang) => (
        //         <option key={lang.id} value={lang.id}>
        //           {lang.language}
        //         </option>
        //       ))}
        //     </select>
        //   </div>

        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Thematic Area</label>
        //     <select
        //       name="thematic_area"
        //       value={formData.thematic_area}
        //       onChange={handleChange}
        //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        //     >
        //       <option value="">Select a thematic area</option>
        //       {thematic.map((themat) => (
        //         <option key={themat.id} value={themat.id}>
        //           {themat.thematic_area}
        //         </option>
        //       ))}
        //     </select>
        //   </div>

        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">ISSN Number</label>
        //     <input
        //       type="text"
        //       name="issn_number"
        //       value={formData.issn_number}
        //       onChange={handleChange}
        //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        //     />
        //   </div>

        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Link</label>
        //     <textarea
        //       name="link"
        //       value={formData.link}
        //       onChange={handleChange}
        //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        //     />
        //   </div>

        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Aim Identifier</label>
        //     <input
        //       type="checkbox"
        //       name="aim_identifier"
        //       checked={formData.aim_identifier}
        //       onChange={handleChange}
        //       className="mr-2 leading-tight"
        //     />
        //   </div>

        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Medline</label>
        //     <input
        //       type="checkbox"
        //       name="medline"
        //       checked={formData.medline}
        //       onChange={handleChange}
        //       className="mr-2 leading-tight"
        //     />
        //   </div>

        //   <div className="space-y-2">
        //     <label className="block text-gray-700 font-medium">Summary</label>
        //     <textarea
        //       name="summary"
        //       value={formData.summary}
        //       onChange={handleChange}
        //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        //     />
        //   </div>

        //   <button
        //     type="submit"
        //     className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        //   >
        //     Save Journal
        //   </button>
        // </form>
       
        <form 
        onSubmit={handleSubmit} 
        className="p-10 bg-white shadow-xl rounded-lg mt-8 mx-auto"
        style={{ 
         // maxWidth: "3600px", 
          padding: "40px", 
          marginRight: "20px", 
          width: "100%",  
          height: "auto" 
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Row 1: Journal Title, Platform, Countries */}
          <div className="col-span-3 lg:col-span-1 space-y-4">
            <label className="block text-gray-700 font-medium">Journal Title</label>
            <input
              type="text"
              name="journal_title"
              value={formData.journal_title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
      
          <div className="col-span-3 lg:col-span-1 space-y-4">
            <label className="block text-gray-700 font-medium">Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select a Platform</option>
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.platform}
                </option>
              ))}
            </select>
          </div>
      
          <div className="col-span-3 lg:col-span-1 space-y-4">
            <label className="block text-gray-700 font-medium">Countries</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select a Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>
      
          {/* Row 2: Publisher's Name, Language, Thematic Area */}
          <div className="col-span-3 lg:col-span-1 space-y-4">
            <label className="block text-gray-700 font-medium">Publisher's Name</label>
            <input
              type="text"
              name="publishers_name"
              value={formData.publishers_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
      
          <div className="col-span-3 lg:col-span-1 space-y-4">
            <label className="block text-gray-700 font-medium">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select a Language</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.language}
                </option>
              ))}
            </select>
          </div>
      
          <div className="col-span-3 lg:col-span-1 space-y-4">
            <label className="block text-gray-700 font-medium">Thematic Area</label>
            <select
              name="thematic_area"
              value={formData.thematic_area}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select a thematic area</option>
              {thematic.map((themat) => (
                <option key={themat.id} value={themat.id}>
                  {themat.thematic_area}
                </option>
              ))}
            </select>
          </div>
      
          {/* Row 3: ISSN Number, Link */}
          <div className="col-span-3 lg:col-span-1 space-y-4">
            <label className="block text-gray-700 font-medium">ISSN Number</label>
            <input
              type="text"
              name="issn_number"
              value={formData.issn_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
      
          <div className="col-span-3 lg:col-span-2 space-y-4">
            <label className="block text-gray-700 font-medium">Link</label>
            <textarea
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
      
          {/* Row 4: Aim Identifier, Medline, Summary */}
          <div className="col-span-3 lg:col-span-1 space-y-4">
            <div className="flex items-center">
              <label className="block text-gray-700 font-medium">African Index Medicus Identifier</label>
              <input
                type="checkbox"
                name="aim_identifier"
                checked={formData.aim_identifier}
                onChange={handleChange}
                className="ml-2 leading-tight"
              />
            </div>
          </div>
      
          <div className="col-span-3 lg:col-span-1 space-y-4">
            <div className="flex items-center">
              <label className="block text-gray-700 font-medium">Medicine and Health Journal</label>
              <input
                type="checkbox"
                name="medline"
                checked={formData.medline}
                onChange={handleChange}
                className="ml-2 leading-tight"
              />
            </div>
          </div>
      
          <div className="col-span-3 space-y-4">
            <label className="block text-gray-700 font-medium">Abtract</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
      
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ width: "auto", margin: "20px auto", display: "block" }}  
        >
          Add Journal
        </button>
      
        {/* <style jsx>{`
          @media (min-width: 1024px) {
            form {
              width: 100%;
              height:100%;
            }
          }
        `}</style> */}
      </form>

      )}
   
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Back ',
    href: '/',
    isActive: true,
  },
]
