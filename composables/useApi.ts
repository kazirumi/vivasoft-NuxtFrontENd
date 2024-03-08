import { useFetch,useRuntimeConfig } from "nuxt/app";

type useFetchType = typeof useFetch;


export const useFetchAPI: useFetchType = (path,options = {})=>{
    
    options.baseURL= useRuntimeConfig().public.apiURL,
    options.headers = {
        ...options.headers,
        Authorization:`Bearer ${useCookie("token").value}`
    }

    return useFetch(path,options)
}