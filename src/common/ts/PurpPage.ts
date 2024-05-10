import { ref } from 'vue'

export default function usePurpPage(){
    const count = ref(0)
    return {count}
}