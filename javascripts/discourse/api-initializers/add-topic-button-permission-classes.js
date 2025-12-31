import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  api.registerValueTransformer("create-topic-button-class", ({ context }) => {
    const { disabled, category, tag } = context;

    const currentUser = api.container.lookup("service:current-user");
    const siteSettings = api.container.lookup("service:site-settings");

    if (disabled !== undefined) {
      return disabled ? "cannot-create-topic" : "can-create-topic";
    }

    const tagRestricted = tag?.staff || false;
    if (tagRestricted && !currentUser?.staff) {
      return "cannot-create-topic";
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
        return "cannot-create-topic";
      }
    }

    return "can-create-topic";
  });
});
