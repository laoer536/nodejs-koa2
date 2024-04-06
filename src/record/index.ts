import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { trace, Tracer } from '@opentelemetry/api'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { success } from '../utils'
import type { RouterContext } from 'koa-router'
import { ApiRes } from '../types/type.global'

export function initializeTracing(serviceName: string): Tracer {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  })

  const consoleExporter = new ConsoleSpanExporter()
  const jaegerExporter = new JaegerExporter({
    endpoint: 'http://localhost:14268/api/traces',
  })

  provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter))
  provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter))

  provider.register()

  return trace.getTracer(serviceName)
}

export const tracer = initializeTracing('nodejs-koa2')

export async function tracerFn<T>(ctx: RouterContext, apiLogic: (ctx: RouterContext) => Promise<T>, desc: string) {
  const recordInfo = {
    request: ctx.request,
    params: ctx.params,
    body: ctx.request.body,
    query: ctx.query,
  }
  await tracer.startActiveSpan(desc, async (requestSpan) => {
    try {
      const { data, message } = (await apiLogic(ctx)) as ApiRes
      requestSpan.setAttribute('http.status', 200)
      requestSpan.setAttribute('http.koa.api', JSON.stringify(recordInfo))
      success(ctx, data, message)
    } catch (e) {
      requestSpan.setAttribute('http.status', 200)
      requestSpan.setAttribute('http.koa.api', JSON.stringify(recordInfo))
      throw e
    } finally {
      requestSpan.end()
    }
  })
}
