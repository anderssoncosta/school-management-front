import { Controller, useFormContext } from "react-hook-form";
import { CourseSchema } from "./schema";

const CourseForm = () => {
  const {register , control, formState: { errors } } = useFormContext<CourseSchema>();

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <div>
              <input
                type="text"
                {...field}
                {...register('name')}
                className="mt-1 px-2 w-full border h-8 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
              )}
            </div>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <div>
              <input
                {...field}
                {...register('description')}
                className="mt-1 px-2 w-full border h-8 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.description && (
                <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default CourseForm;