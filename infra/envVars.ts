import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config({ path: '../.env' })


const schema = {
  AWS_PREFIX: Joi
    .string()
    .required(),

  AWS_SSH_KEY_NAME: Joi
    .string()
    .required(),

  SSH_IP: Joi
    .string()
    .ip()
    .required(),

  VPC_CIDR_BLOCK: Joi
    .string()
    .ip({ cidr: 'required' })
    .required(),

  EC2_INSTANCE_TYPE: Joi
    .string()
    .optional()
    .default('t2.micro'),
}

/* Validate the expected ENV VARs */
const { value, error } = Joi.object().keys(schema)
  .required()
  .validate(
    process.env,
    {
      abortEarly: false,
      allowUnknown: true,
    },
  )

if (error) {
  process.stderr.write(`Invalid ENV VAR:
${error.details.map(({ message, context }) => `  ${message}; currently ${context?.key}=${context?.value}`).join('\n')}
\n`)
  process.exit(1)
}

/**
 * Be sure that the Server will run only with filtered, valid, and converted Env VARs
 * that no one can add / remove / edit
 */
export default Object.freeze(value)
