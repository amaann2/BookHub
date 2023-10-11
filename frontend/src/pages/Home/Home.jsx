import './Home.css'
import Hero from '../../components/Hero-section/Hero'
import Subscrbe from '../../components/Subscribe/Subscrbe'
import Counter from '../../components/Counter/Counter'
import Testimonial from '../../components/Testimonial/Testimonial'
import Offer from '../../components/offer/Offer'
import Category from '../../components/Category/Category'
import FeatureBook from '../../components/FeatureBook/FeatureBook'
const Home = () => {
    return (
        <>
            <Hero />
            <Category />
            <FeatureBook />
            <Offer />
            <Testimonial />
            <Counter />
            <Subscrbe />
        </>
    )
}

export default Home