export let States = {
    TEST_IS_RUNNING: process.env.JEST_WORKER_ID !== undefined || process.env.NODE_ENV === 'test'
}