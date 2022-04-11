
class BoxWebpackResolverPlugin {
  constructor(source, target) {
    this.source = 'resolve';
    this.target = 'internalResolve';
  }

  apply(resolver) {
    const target = resolver.ensureHook(this.target);
    resolver
      .getHook(this.source)
      .tapAsync(
        'BoxResolverPlugin',
        (request, resolveContext, callback) => {
          if (request.request.startsWith('@box')) {


            const req = request.request.replace('@box/', '');
            const newReq = Object.assign({}, request, {
              request: './src/_box/' + req,
            });
            return resolver.doResolve(
              target,
              newReq,
              null,
              resolveContext,
              callback
            );
            callback();
          }
          return resolver.doResolve(
            target,
            request,
            null,
            resolveContext,
            callback
          );
        }
      );
  }
}


class BoxWebpackPlugin {

  apply(compiler) {
    this.addResolverPlugin(compiler);
  }

  addResolverPlugin(compiler) {
    compiler.hooks.environment.tap('BoxWebpackPlugin', () => {
      const resolvePlugin = new BoxWebpackResolverPlugin(this.options);
      if (Array.isArray(compiler.options.resolve.plugins)) {
        compiler.options.resolve.plugins.push(resolvePlugin);
      } else {
        compiler.options.resolve.plugins = [resolvePlugin];
      }
    });
  }
}
module.exports = BoxWebpackPlugin;