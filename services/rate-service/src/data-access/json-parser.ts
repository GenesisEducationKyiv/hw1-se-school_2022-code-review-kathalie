export class JsonParser {
    public static async getValue(json: Object, ...jsonKeys) {
        let res = json;

        for (let key of jsonKeys) {
            res = res[key];
        }

        return res;
    }
}
