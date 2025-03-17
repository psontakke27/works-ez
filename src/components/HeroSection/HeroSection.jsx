import React, {useState,useEffect}from "react";
import "./HeroSection.css";


function HeroSection() {
    const [cards] = useState([
        {
            image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRNCB_B0AuJd6rH6pom9DfrdNhZbhQRmtNOlpwF_ws92S9xpxJi",
            title: "Presentation Design",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ-EXZXkc_k81nbeY9sGpWM1vIihH9_BAvuM3csRIgEDzRls0Br",
            title: "Audio-Visual Production",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTRko9KgesIQBj7N7vil0fR_uiDdOnd1zmLQBXpSzfdXbXVmtt2",
            title: "Translation Services",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQi5eenbpoWreHD1ufKoJd7wJldfFkOpFh4cm1Vnr24apP2ACBx",
            title: "Graphic Design",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTuJwV6JrWdcPFxLOCt2i4v2au8acDccpUlrCAIU5C427TrvHgZ",
            title: "Research & Analytics",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT73o-P_3CTJhIOrk3lDXL99dDk8eMoB6e1DlWmJwDHDcquSUd0",
            title: "Data Processing",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        }
    ]);
    const [formValues, setFormValues] = useState({ email: "" });
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setSuccessMessage(""); // Clear previous success messages

        if (!validateEmail(formValues.email)) {
            setFormErrors({ email: "Invalid email format" });
            return;
        }

        if (formValues.email.endsWith("@ez.works")) {
            setError("Emails with '@ez.works' domain are not allowed.");
            return;
          }

        try {
            const response = await fetch("https://test.ezworks.ai/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formValues.email }),
            });

            const data = await response.json();
            console.log("Response received:", data);


            if (response.ok) {
                setSuccessMessage("Form Submitted Successfully!");
                setFormValues({ email: "" }); 
                setFormErrors({}); 
            } else {
                            
            if (data.detail) {
                if (data.detail) {
                    setError(typeof data.detail === "string" ? data.detail : "Something went wrong");
                } else {
                    setError(data.message || "Something went wrong");
                }
            } else {
                setError(data.message || "Something went wrong");
            }

                
            }

            
        } catch (err) {
            setError("Network error. Please try again.");
        }
    };

    
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 1000); 
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className='heroSection'>
            <div className='heroSection_box'>
                <div className='heroSection_box_left'>
                    <div className='ez-logo'>
                        <img alt='ez' src="https://tse2.mm.bing.net/th?id=OIP.Y--eGB1RF8fOs2wcVZjvwQHaCE&pid=Api&P=0&h=180" />
                    </div>
                    <h2>A Suite of Business Support Services</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error consequuntur alias aspernatur soluta, beatae dolor nihil incidunt ipsum. At quasi repellat nam perspiciatis quam. Officia maiores quasi voluptatum quaerat quos.</p>
                    <div className='form-content'>
                        <form onSubmit={handleSubmit}>
                            <div className='input-group'>
                                <input
                                    
                                    type="text"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                                
                                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
  
                                <button type="submit">Contact Me</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='heroSection_box_right'>
                    <div className='container'>
                        <div className='cards'>
                            {cards.map((card, i) => (
                                <div key={i} className='card'>
                                    <div className='card-content'>
                                        <img alt='logo' src={card.image} />
                                        <h3>{card.title}</h3>
                                    </div>
                                    <p>{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {successMessage && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setSuccessMessage("")}>&times;</span>
                        <p>{successMessage}</p>

                    </div>
                </div>
            )}
        </div>
    );
}

export default HeroSection;
