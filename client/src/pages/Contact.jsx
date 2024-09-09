import { useState } from "react";
import { useAuth } from "../store/Auth";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { user } = useAuth()

  const [userData, setUserData] = useState(true)

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: ""
    })
    setUserData(false)
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      })
      if (response.ok) {
        setContact({
          message: ""
        })
      }
      const data = await response.json()
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Your Name"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Enter Your Message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d365.01351597875293!2d77.16405607508577!3d28.72961293325758!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0196f35bae77%3A0x55548f4104377a40!2s450%2C%20I%20Block%2C%20Block%20I%201%2C%20Jahangirpuri%2C%20New%20Delhi%2C%20Delhi%2C%20110033!5e1!3m2!1sen!2sin!4v1716696348797!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;
