import { Link } from "react-router-dom"
import { useAuth } from "../store/Auth"

const Home = () => {

  const { user, isLoading } = useAuth()

  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              {isLoading ? "" : (user.isAdmin ? <Link to="/admin"><button>Go To Admin Section</button></Link> : "")}
              {user ? <p>Welcome {user.username}</p> : ""}
              <h1>Anand Dwivedi's Admin Pannel</h1>
              <p>I'm Full Stack Developer</p>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At Thapa Technical,
                we specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <Link to="/contact">
                  <button className="btn">Connect now</button>
                </Link>
                <Link to="/services">
                  <button className="btn secondary-btn">Learn more</button>
                </Link>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 3rd section  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/design.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how Thapa Technical can help your business thrive in
              the digital age.
            </p>
            <div className="btn btn-group">
              <Link to="/contact">
                <button className="btn">Connect now</button>
              </Link>
              <Link to="/services">
                <button className="btn secondary-btn">Learn more</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home