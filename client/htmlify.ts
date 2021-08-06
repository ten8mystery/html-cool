import Htmlifier, { Logger, ProjectSource } from '../src/htmlifier.ts'
import { ConversionOptions } from './options.ts'

export const htmlify = async (options: ConversionOptions, log?: Logger) => {
  const htmlifier = new Htmlifier()
  const project: ProjectSource =
    options['upload-mode'] === 'file'
      ? {
          type: 'file',
          file:
            options.file ||
            (await Promise.reject(
              new Error("You didn't select a project file.")
            ))
        }
      : options['upload-mode'] === 'url'
      ? { type: 'url', url: options['project-url'] }
      : { type: 'id', id: String(options.id) }
  return htmlifier.htmlify(project, {
    zip: options.zip,
    includeVm: true,

    title: options.title,
    username: options.username,

    width: options.wider ? options.width : 480,
    height: options.wider ? options.height : 360,
    stretch: options.stretch === 'stage',

    autoStart: options.autostart,
    turbo: options.turbo,
    fps: options.compatibility ? 60 : 30,
    limits: !options['no-limits'],
    fencing: !options['no-limits'],
    pointerLock: options['pointer-lock'],

    cursor:
      options.cursor === 'file'
        ? options['cursor-file']
        : options.cursor === 'none'
        ? 'hidden'
        : null,
    favicon: options['favicon-file'],
    backgroundImage: options['background-file'],

    extensions: options['extension-url'] ? [options['extension-url']] : [],

    loading: {
      progressBar: options.progress ? options['progress-colour'] : null,
      image:
        options['loading-image'] === 'file'
          ? options['loading-image-file']
          : options['loading-image-url'],
      stretch: options.stretch !== 'none'
    },

    buttons: {
      startStop: options['start-stop-controls'],
      fullscreen: options.fullscreen
    },

    monitors: {
      background: options['use-colour']
        ? options['monitor-colour']
        : options['transparent-monitor']
        ? 'none'
        : null,
      text: options['monitor-text']
    },

    cloud: {
      serverUrl:
        options['cloud-provider'] === 'ws' ? options['cloud-ws'] : null,
      specialBehaviours: options['special-cloud'],
      projectId: String(options.id)
    },

    log
  })
}