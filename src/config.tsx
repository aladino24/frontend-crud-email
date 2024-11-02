interface ApiConfig {
    server1: string;
}

interface ConfigType {
    api: ApiConfig;
}

const Config: ConfigType = {
    api: {
        server1: "http://127.0.0.1:1234",
    },
};

export default Config;
