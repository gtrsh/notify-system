import S from 'fluent-json-schema'

const postNotificationSchema = {
  body: S.object()
    .prop('ids', S.array().items(S.string())
      .minItems(1)
      .maxItems(100)
      .required())
    .prop('text', S.string().required())
}

export {
  postNotificationSchema
}
