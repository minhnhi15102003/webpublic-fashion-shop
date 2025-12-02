import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useQueryParams() {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   const createQueryString = useCallback(
      (name: string, value?: string | string[]) => {
         const params = new URLSearchParams(searchParams);
         if (value) {
            if (typeof value === 'string' || typeof value === 'number') {
               params.set(name, value);
            } else if (Array.isArray(value)) {
               if (params.has(name)) {
                  params.delete(name);
               }
               value.forEach((val) => {
                  params.append(name, val);
               });
            }
         } else {
            params.delete(name);
         }

         return params.toString();
      },
      [searchParams]
   );

   const deleteMultipleParamQueryString = useCallback(
      (name: string[]) => {
         const params = new URLSearchParams(searchParams);
         name.forEach((item) => params.delete(item));

         return params.toString();
      },
      [searchParams]
   );

   const setQueryParam = (queryName: string, value?: string | string[]) => {
    
      router.push(`${pathname}?${createQueryString(queryName, value)}`);
   };
   const deleteQueryParam = (queryName: string | string[]) => {
      if (typeof queryName === 'string') {
         router.push(`${pathname}?${createQueryString(queryName)}`);
      } else {
         router.push(`${pathname}?${deleteMultipleParamQueryString(queryName)}`);
      }
   };

   return { queryParams: searchParams, createQueryString, setQueryParam, deleteQueryParam };
}
