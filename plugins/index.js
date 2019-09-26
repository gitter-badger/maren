/**
 * Load plugins (all, or by type like "command")
 */
module.exports = (json, type, folder) => {
  if (!json || !json['plugins']) {
    return [];
  }

  const plugins = json['plugins']
    .map(p => require(`${folder}/node_modules/${p}`))
    .filter(p => !type || p.type === type);

  return plugins;
};
