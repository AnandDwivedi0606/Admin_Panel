import { useAuth } from "../store/Auth"

const Service = () => {

  const { services } = useAuth()

  return (
    <>
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>

        <div className="container flex-container">
          {
            services.map((item, index) => {
              const { provider, price, service, description } = item

              return <div className="card" key={index}>
                <div className="card-img">
                  <img src="./images/design.png" alt="Our Services Info" width="200" />
                </div>
                <div className="card-details">
                  <div className="gri">
                    <p>{provider}</p>
                    <p>{price}</p>
                  </div>
                  <h2>{service}</h2>
                  <p>{description}</p>
                </div>
              </div>
            })
          }
        </div>
      </section>
    </>
  )
}

export default Service