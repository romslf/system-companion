import Store from 'electron-data-storage'

export const state = () => ({
	process_refresh_time: Store.get('process_refresh_time') || 2,
    docker_refresh_time: Store.get('docker_refresh_time') || 10
})

export const mutations = {
    setPRT(state, time) {
		console.log("Settings updated !")
    	state['process_refresh_time'] = time;
    	Store.set('process_refresh_time', time);
    },
	setDRT(state, time) {
		console.log("Settings updated !")
		state['docker_refresh_time'] = time;
		Store.set('docker_refresh_time', time);
	}
  }
