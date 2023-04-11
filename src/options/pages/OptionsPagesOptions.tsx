import React, { type FC } from 'react'
import { Field, Formik, type FormikErrors } from 'formik'
import { Button } from '../../components/Button'

export interface OptionsPageOptionsProps {

}

interface OptionsFormValues {
  darkBrowserIcons: boolean
}

export const OptionsPagesOptions: FC<OptionsPageOptionsProps> = () => {
  const initialValues: OptionsFormValues = {
    darkBrowserIcons: false
  }

  return (
    <div className={'max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-base dark:text-white'}>
      <h1 className={'text-xl font-bold dark:text-white'}>Browser Extension Options</h1>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: FormikErrors<OptionsFormValues> = {}
          if (!values.darkBrowserIcons) {
            errors.darkBrowserIcons = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ values }) => (
          <form className={'dark:text-white text-lg'}>
            <label htmlFor="darkBrowserIcons" className={'flex gap-2'}>
              <div>
                <Field type="checkbox" name="darkBrowserIcons" id="darkBrowserIcons" />
              </div>
              <span className={'pt-0.5'}>Dark Browser Icons</span>
            </label>
            <div className={'flex flex-row-reverse gap-2'}>
              <div>
                <Button>Submit</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
