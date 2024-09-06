// fetcher.ts 파일
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

// const fetcher = (url: string) => axios.get(`http://localhost:5001${url}`).then(res => res.data);

export default fetcher;
