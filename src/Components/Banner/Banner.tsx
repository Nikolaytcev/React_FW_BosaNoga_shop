import bannerImg from '../../img/banner.jpg'

export const Banner = () => {
  return (
    <div className="banner">
        <img src={bannerImg} className="img-fluid" alt="К весне готовы!"></img>
        <h2 className="banner-header">К весне готовы!</h2>
    </div>
  )
}
