import { IAppointment } from "../shared/interfaces/appointment.interface";
import { useHttp } from "../hooks/http.hook";

const useAppointmentService = () => {
    const { loadingStatus, request } = useHttp();
    const _apiBase = 'https://test.v5.pryaniky.com';


    const authorizationRequest = async (body: any) => {
        return await request({
            url: `${_apiBase}/ru/data/v3/testmethods/docs/login`,
            method: "POST",
            body: JSON.stringify(body),
        })
    }

    const getData = async (token: any) => {
        return await request({
            url: `${_apiBase}/ru/data/v3/testmethods/docs/userdocs/get`,
            method: "GET",
            headers: { 'x-auth': `${token}` }
        })
    }

    const pushItem = async (body: any, token: any) => {
        return await request({
            url: `${_apiBase}/ru/data/v3/testmethods/docs/userdocs/create`,
            method: "POST",
            headers: { 'Content-Type': "application/json", 'x-auth': `${token}` },
            body: JSON.stringify(body),
        })
    }
    const deleteItem = async (token: any, id: any) => {
        return await request({
            url: `${_apiBase}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
            method: "POST",
            headers: { 'Content-Type': "application/json", 'x-auth': `${token}` },
        })
    }
    const changeItem = async (body: any, token: any, id: any) => {
        return await request({
            url: `${_apiBase}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
            method: "POST",
            headers: { 'Content-Type': "application/json", 'x-auth': `${token}` },
            body: JSON.stringify(body),
        })
    }
    // const getAllAppointments = async (): Promise<IAppointment[]> => {
    //     const res = await request({ url: _apiBase });
    //     if (res.every((item: IAppointment) => hasRequiredFields(item, requiredFields))) {
    //         return res;
    //     } else {
    //         throw new Error('Data doesnt have all the fields')
    //     }
    // }

    // const getAllActiveAppointments = async () => {
    //     const base = await getAllAppointments();
    //     const transformed: ActiveAppointment[] = base
    //         .filter((item => {
    //             return !item.canceled && dayjs(item.date).diff(undefined, "minute") > 0;
    //         }))
    //         .map((item) => {

    //             return {
    //                 id: item.id,
    //                 date: item.date,
    //                 name: item.name,
    //                 service: item.service,
    //                 phone: item.phone,
    //             }
    //         })
    //     return transformed;
    // }

    // const cancelOneAppointment = async (id: number) => {
    //     return await request({
    //         url: `${_apiBase}/${id}`,
    //         method: "PATCH",
    //         body: JSON.stringify({
    //             canceled: true
    //         })
    //     });
    // }

    // const createNewAppointment = async (body: IAppointment) => {
    //     const id = new Date().getTime();
    //     body["id"] = id;
    //     body['date'] = dayjs(body.date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm');
    //     return await request({
    //         url: _apiBase,
    //         method: "POST",
    //         body: JSON.stringify(body),
    //     })
    // }

    return {
        loadingStatus, authorizationRequest, getData, pushItem, deleteItem, changeItem
    }
}
export default useAppointmentService;

