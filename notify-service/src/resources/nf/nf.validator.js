import S from 'fluent-json-schema'

const postNotificationSchema = {
  body: S.object()
    .prop('name', S.string().required())
    .prop('text_template', S.string().required())
}

export {
  postNotificationSchema
}
