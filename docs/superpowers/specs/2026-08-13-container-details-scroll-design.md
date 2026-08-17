# Container Details Scroll Design

The container-details modal keeps its header and view tabs fixed while the content area owns vertical scrolling. Views with a fixed `70vh` content height, including Routes and Permissions, receive `overflow-y-auto`; other views retain their current bounded scrolling behavior.

The change is limited to the modal content wrapper. A small pure class-name helper makes the behavior directly testable without coupling the regression test to the full modal's dependencies.

