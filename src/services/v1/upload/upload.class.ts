/* eslint-disable no-unused-vars */
export const Upload = class Upload {
    private options: any;
    constructor(options: any) {
        this.options = options || {};
    }

    async create(data: any, params: any): Promise<any> {
        if (Array.isArray(data)) {
            return Promise.all(data.map((current) => this.create(current, params)));
        }
        // console.log(data);
        return data;
    }
};
