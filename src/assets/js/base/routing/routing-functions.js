import checkCurrentPage from "../checks/check-current-page";
import currentYear from "../common/get-current-year";
import scrollHeader from "../../components/scroll/scroll-header";
import sliderServices from "../../components/slider/slider-services";
import sliderPlans from "../../components/slider/slider-plans";
import sliderReviews from "../../components/slider/slider-reviews";
import sliderGallery from "../../components/slider/slider-gallery";
import sliderSchedule from "../../components/slider/slider-schedule";
import toggleFaq from "../../components/toggle/toggle-faq";
import togglePopup from "../../components/toggle/toggle-popup";
import toggleOrderSteps from "../../components/toggle/toggle-order-steps";
import toggleFilters from "../../components/toggle/toggle-filters";
import form from "../../components/form/form";
import order from "../../components/form/order";
import calendar from "../../components/form/calendar";
import animationHero from "../../components/animation/animation-hero";
import toggleTrainingDate from "../../components/toggle/toggle-training-date";

export default function routingFunctions() {
  checkCurrentPage();
  currentYear();
  scrollHeader();
  sliderServices();
  sliderPlans();
  sliderReviews();
  sliderGallery();
  toggleFaq();
  form();
  animationHero();
  togglePopup();
  toggleOrderSteps();
  calendar();
  toggleFilters();
  sliderSchedule();
  order();
  toggleTrainingDate();
}