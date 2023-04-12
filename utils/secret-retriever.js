import * as dotenv from 'dotenv'
dotenv.config()
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";


const client = new SecretsManagerClient({
  region: process.env.AWS_REGION,
});

const retrieveSecret = async (secret_name) => {
    let response;

    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT",
            })
        );
    } catch (error) {
        throw error;
    }

    return response.SecretString;
}

export default retrieveSecret;