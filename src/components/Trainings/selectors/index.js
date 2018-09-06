export default state => ({
  trainings: state.trainings.data,
  isLoading: state.trainings.isLoading,
  hasLoaded: state.trainings.hasLoaded,
});