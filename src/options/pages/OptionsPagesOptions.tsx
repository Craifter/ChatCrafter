import React, { type FC, useEffect } from 'react'
import { type FormikErrors, useFormik } from 'formik'
import { Button } from '../../components/Button'
import Browser from 'webextension-polyfill'

export interface OptionsPageOptionsProps {

}

interface OptionsFormValues {
  whiteBrowserIcons: boolean
}

export const OptionsPagesOptions: FC<OptionsPageOptionsProps> = () => {
  const formik = useFormik({
    initialValues: {
      whiteBrowserIcons: false
    },
    validate: (values) => {
      const errors: FormikErrors<OptionsFormValues> = {}
      if (values.whiteBrowserIcons === undefined) errors.whiteBrowserIcons = '- Required'
      return errors
    },
    onSubmit: async (values, actions) => {
      await Browser.storage.sync.set({ syncOptions: values })
      actions.setSubmitting(false)
    }
  })

  useEffect(() => {
    void (async () => {
      const { syncOptions } = await Browser.storage.sync.get('syncOptions')
      if (syncOptions.whiteBrowserIcons !== undefined) {
        await formik.setFieldValue('whiteBrowserIcons', syncOptions.whiteBrowserIcons)
      }
    })()
  }, [])

  return (
    <div className={'max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-base dark:text-white'}>
      <h1 className={'text-xl font-bold dark:text-white'}>Browser Extension Options</h1>
        <form onSubmit={formik.handleSubmit} className={'dark:text-white text-lg'}>
          <label htmlFor="whiteBrowserIcons" className={'flex gap-2'}>
            <div>
              <input type="checkbox" name="whiteBrowserIcons" id="whiteBrowserIcons" onChange={formik.handleChange} checked={formik.values.whiteBrowserIcons} />
            </div>
            <span className={'pt-0.5'}>
              White Extension Icon
              {(formik.errors.whiteBrowserIcons != null) ? <span className={'text-red-500'}> {formik.errors.whiteBrowserIcons}</span> : null}
            </span>
          </label>
          <div className={'flex flex-row-reverse gap-2'}>
            <div>
              <Button type='submit'>Submit</Button>
            </div>
          </div>
      </form>
    </div>
  )
}
