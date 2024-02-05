import checkCurrentPage from "../checks/check-current-page";
import currentYear from "../common/get-current-year";
import scrollHeader from "../../components/scroll/scroll-header";
import sliderServices from "../../components/slider/slider-services";
import sliderPlans from "../../components/slider/slider-plans";
import sliderReviews from "../../components/slider/slider-reviews";
import toggleFaq from "../../components/toggle/toggle-faq";

export default function routingFunctions() {
  checkCurrentPage();
  currentYear();
  scrollHeader();
  sliderServices();
  sliderPlans();
  sliderReviews();
  toggleFaq();
}