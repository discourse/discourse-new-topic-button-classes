import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  api.registerValueTransformer("create-topic-button-class", ({ value, context }) => {
    const { disabled, category, tag } = context;

    const currentUser = api.container.lookup("service:current-user");
    const siteSettings = api.container.lookup("service:site-settings");

    if (disabled !== undefined) {
      const className = disabled ? "cannot-create-topic" : "can-create-topic";
      value.push(className);
      return value;
    }

    const tagRestricted = tag?.staff || false;
    if (tagRestricted && !currentUser?.staff) {
      value.push("cannot-create-topic");
      return value;
    }

    if (category) {
      let canPost = category.canCreateTopic;

      if (
        !canPost &&
        siteSettings?.default_subcategory_on_read_only_category &&
        category.subcategoryWithCreateTopicPermission
      ) {
        canPost = true;
      }

      if (!canPost) {
        value.push("cannot-create-topic");
        return value;
      }
    }

    value.push("can-create-topic");
    return value;
  });
});
