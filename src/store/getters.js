
export default {
  getConfig: state => state.config,
  getSettings: state => state.settings,
  getUser: state => state.user,
  getDisplayName: state => state.displayName,
  getTotalPomodoros: state => state.statistics.totalPomodoros
}
