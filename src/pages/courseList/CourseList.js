import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Menu } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

const ItemTypes = {
  COURSE: "course",
};

const fetchCourses = async () => {
  const response = await fetch("/courses.json");
  return response.json();
};

const CourseItem = ({ course, index, moveCourse, removeCourse }) => {
  const [, ref] = useDrag({
    type: ItemTypes.COURSE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.COURSE,
    hover: (item) => {
      if (item.index === index) return;
      moveCourse(item.index, index);
      item.index = index;
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="bg-white p-4 mb-2 rounded mr-[90px] shadow-md flex justify-between items-center cursor-pointer"
    >
      <img src={course.icon} alt="dndMenu" className="w-4" />
      <div className="flex w-full flex-row justify-between items-center px-5 ">
        <div className="flex flex-row justify-center items-center">
          <img
            src={course.image}
            alt={course.title}
            className="w-[133px] h-[75px] rounded mr-4"
          />
          <div className="font-medium text-[20px]">{course.title}</div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="text-[18px]">{course.price}</div>
          <div className="ml-4 bg-[#DBFFCE] border border-gray-200 px-2 py-1 rounded">
            {course.type}
          </div>
        </div>
      </div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600">
            <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => moveCourse(index, 0)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Move to Top
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => moveCourse(index, 4)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Move to Bottom
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => removeCourse(index)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-red-500`}
                >
                  Remove
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    loadCourses();
  }, []);

  const moveCourse = (fromIndex, toIndex) => {
    const updatedCourses = Array.from(courses);
    const [movedCourse] = updatedCourses.splice(fromIndex, 1);
    updatedCourses.splice(toIndex, 0, movedCourse);
    setCourses(updatedCourses);
  };

  const removeCourse = (index) => {
    const updatedCourses = Array.from(courses);
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8 bg-[#b2d5b6] pr-[140px] min-h-screen">
        <div className=" font-sans font-bold text-[#4F6F52] text-[80px] text-center pb-7 ">
          Chai aur Code
        </div>
        <div className="bg-white p-8 rounded-xl flex flex-col ">
          <div>
            <div className="font-bold text-[40px] ">Manage Bundle</div>
            <div className="text-[20px] text-[#737070] leading-[24px]">
              Change orders of the products based on priority
            </div>
          </div>
          <div className="my-[31px] ">
            {courses.map((course, index) => (
              <CourseItem
                key={course.id}
                index={index}
                course={course}
                moveCourse={moveCourse}
                removeCourse={removeCourse}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default CourseList;
