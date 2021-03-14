let queryStartTime;

let providerEnum = {'talabat': 1};
let providerSpread = {1: 0};

let statistics = {
  pruned: {
    closed: Object.assign({}, providerSpread),
    fakeDeal: Object.assign({}, providerSpread)
  },
  time: 0
};

module.exports = {
  addClosedRestaurant(provider){
    statistics.pruned.closed[providerEnum[provider]]++;
  },
  addFakeDealRestaurant(provider){
    statistics.pruned.fakeDeal[providerEnum[provider]]++;
  },
  startQueryTimer: ()=>queryStartTime = Date.now(),
  stopQueryTimer: ()=>statistics.time = ((Date.now()-queryStartTime)/1000).toFixed(2),
  getStatistics: ()=> statistics
}