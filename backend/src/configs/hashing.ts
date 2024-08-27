interface BcryptConfig {
    rounds: number;
}

const hashingConfig: { bcrypt: BcryptConfig } = {
    bcrypt: {
        rounds: 10,
    },
};

export default hashingConfig;
